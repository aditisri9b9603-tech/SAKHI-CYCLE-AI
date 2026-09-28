import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  db,
  loginWithGoogle as fbLoginWithGoogle,
  loginWithEmail as fbLoginWithEmail,
  registerWithEmail as fbRegisterWithEmail,
  logoutUser,
  testConnection,
  handleFirestoreError,
  OperationType,
  User,
} from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { UserProfile, CycleEntry, VoiceNote, Consultation } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  cycleEntries: CycleEntry[];
  voiceNotes: VoiceNote[];
  consultations: Consultation[];
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, displayName: string, objective?: 'balance' | 'fertility') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  saveCycleEntry: (entry: Omit<CycleEntry, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  saveVoiceNote: (note: Omit<VoiceNote, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  saveConsultation: (consult: Omit<Consultation, 'id' | 'userId' | 'status' | 'createdAt'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cycleEntries, setCycleEntries] = useState<CycleEntry[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  // Test connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or initialize user profile
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userPath = `users/${currentUser.uid}`;
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfile);
          } else {
            const initialProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || 'sister@sanctuary.bio',
              displayName: currentUser.displayName || 'Genevieve Thorne',
              currentPhase: 'Follicular',
              cycleDay: 9,
              objective: 'balance',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, initialProfile);
            setUserProfile(initialProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, userPath);
        }
      } else {
        setUserProfile(null);
        setCycleEntries([]);
        setVoiceNotes([]);
        setConsultations([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync Cycle Entries, Voice Notes, and Consultations when user is logged in
  useEffect(() => {
    if (!user) return;

    // 1. Cycle Entries
    const entriesPath = `users/${user.uid}/cycleEntries`;
    const cycleQuery = query(collection(db, 'users', user.uid, 'cycleEntries'), orderBy('createdAt', 'desc'));
    const unsubCycle = onSnapshot(
      cycleQuery,
      (snapshot) => {
        const items: CycleEntry[] = [];
        snapshot.forEach((docSnap) => items.push(docSnap.data() as CycleEntry));
        setCycleEntries(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, entriesPath);
      }
    );

    // 2. Voice Notes
    const voiceNotesPath = `users/${user.uid}/voiceNotes`;
    const voiceQuery = query(collection(db, 'users', user.uid, 'voiceNotes'), orderBy('createdAt', 'desc'));
    const unsubVoice = onSnapshot(
      voiceQuery,
      (snapshot) => {
        const items: VoiceNote[] = [];
        snapshot.forEach((docSnap) => items.push(docSnap.data() as VoiceNote));
        setVoiceNotes(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, voiceNotesPath);
      }
    );

    // 3. Consultations
    const consultPath = `users/${user.uid}/consultations`;
    const consultQuery = query(collection(db, 'users', user.uid, 'consultations'), orderBy('createdAt', 'desc'));
    const unsubConsult = onSnapshot(
      consultQuery,
      (snapshot) => {
        const items: Consultation[] = [];
        snapshot.forEach((docSnap) => items.push(docSnap.data() as Consultation));
        setConsultations(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, consultPath);
      }
    );

    return () => {
      unsubCycle();
      unsubVoice();
      unsubConsult();
    };
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      const res = await fbLoginWithGoogle();
      const userRef = doc(db, 'users', res.user.uid);
      const userPath = `users/${res.user.uid}`;
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        const newProf: UserProfile = {
          uid: res.user.uid,
          email: res.user.email || '',
          displayName: res.user.displayName || 'Sanctuary Sister',
          currentPhase: 'Follicular',
          cycleDay: 9,
          objective: 'balance',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        try {
          await setDoc(userRef, newProf);
          setUserProfile(newProf);
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, userPath);
        }
      }
    } catch (err) {
      console.error('Google login failed:', err);
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await fbLoginWithEmail(email, pass);
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    displayName: string,
    objective: 'balance' | 'fertility' = 'balance'
  ) => {
    const res = await fbRegisterWithEmail(email, pass);
    const userRef = doc(db, 'users', res.user.uid);
    const userPath = `users/${res.user.uid}`;
    const newProf: UserProfile = {
      uid: res.user.uid,
      email: res.user.email || email,
      displayName: displayName || 'Sanctuary Sister',
      currentPhase: 'Follicular',
      cycleDay: 9,
      objective,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(userRef, newProf);
      setUserProfile(newProf);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, userPath);
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    const userRef = doc(db, 'users', user.uid);
    const userPath = `users/${user.uid}`;
    const updated: UserProfile = {
      ...userProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(userRef, updated);
      setUserProfile(updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, userPath);
    }
  };

  const saveCycleEntry = async (entry: Omit<CycleEntry, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User must be authenticated to log cycle data');
    const id = `cycle_${Date.now()}`;
    const entryPath = `users/${user.uid}/cycleEntries/${id}`;
    const docRef = doc(db, 'users', user.uid, 'cycleEntries', id);
    const payload: CycleEntry = {
      ...entry,
      id,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(docRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, entryPath);
    }
  };

  const saveVoiceNote = async (note: Omit<VoiceNote, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User must be authenticated to save voice note');
    const id = `voice_${Date.now()}`;
    const notePath = `users/${user.uid}/voiceNotes/${id}`;
    const docRef = doc(db, 'users', user.uid, 'voiceNotes', id);
    const payload: VoiceNote = {
      ...note,
      id,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(docRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, notePath);
    }
  };

  const saveConsultation = async (consult: Omit<Consultation, 'id' | 'userId' | 'status' | 'createdAt'>) => {
    if (!user) throw new Error('User must be authenticated to book consultation');
    const id = `consult_${Date.now()}`;
    const consultPath = `users/${user.uid}/consultations/${id}`;
    const docRef = doc(db, 'users', user.uid, 'consultations', id);
    const payload: Consultation = {
      ...consult,
      id,
      userId: user.uid,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(docRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, consultPath);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        cycleEntries,
        voiceNotes,
        consultations,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        updateProfile,
        saveCycleEntry,
        saveVoiceNote,
        saveConsultation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
