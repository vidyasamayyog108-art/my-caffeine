import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language, Member, PhotoModerationStatus } from "./types";

export interface PaymentConfig {
  upiId: string;
  qrImageDataUrl: string;
}

interface UserStore {
  currentUser: Member | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isProfileComplete: boolean;
  mobileNumber?: string;
  currentLanguage: Language;
  photoModerationStatus?: PhotoModerationStatus;
  paymentConfig: PaymentConfig;
  dailyMessageCount: number;
  adminAuthenticated: boolean;
  setCurrentUser: (user: Member | null) => void;
  setIsAdmin: (admin: boolean) => void;
  setIsProfileComplete: (complete: boolean) => void;
  setMobileLogin: (mobile: string) => void;
  setLanguage: (lang: Language) => void;
  setPhotoModerationStatus: (status: PhotoModerationStatus) => void;
  setPaymentConfig: (config: PaymentConfig) => void;
  setDailyMessageCount: (count: number) => void;
  setAdminAuthenticated: (v: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoggedIn: false,
      isAdmin: false,
      isProfileComplete: false,
      mobileNumber: undefined,
      currentLanguage: "marathi",
      photoModerationStatus: undefined,
      paymentConfig: { upiId: "vivahsetu@ptaxis", qrImageDataUrl: "" },
      dailyMessageCount: 0,
      adminAuthenticated: false,
      setCurrentUser: (user) => set({ currentUser: user, isLoggedIn: !!user }),
      setIsAdmin: (admin) => set({ isAdmin: admin }),
      setIsProfileComplete: (complete) => set({ isProfileComplete: complete }),
      setMobileLogin: (mobile) =>
        set({ mobileNumber: mobile, isLoggedIn: true }),
      setLanguage: (lang) => set({ currentLanguage: lang }),
      setPhotoModerationStatus: (status) =>
        set({ photoModerationStatus: status }),
      setPaymentConfig: (config) => set({ paymentConfig: config }),
      setDailyMessageCount: (count) => set({ dailyMessageCount: count }),
      setAdminAuthenticated: (v) => set({ adminAuthenticated: v }),
      logout: () =>
        set({
          currentUser: null,
          isLoggedIn: false,
          isAdmin: false,
          isProfileComplete: false,
          mobileNumber: undefined,
          photoModerationStatus: undefined,
          dailyMessageCount: 0,
          adminAuthenticated: false,
        }),
    }),
    {
      name: "vivah-setu-user",
    },
  ),
);
