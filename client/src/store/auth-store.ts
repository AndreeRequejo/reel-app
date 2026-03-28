'use client';
import { create } from "zustand";
import {
  getMe,
  login as loginAction,
  logout as logoutAction,
  refresh as refreshAction,
} from "@/actions";
import { AuthUser, LoginPayload } from "@/interfaces/auth";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  fetchCurrentUser: () => Promise<AuthUser | null>;
  refreshSession: () => Promise<string | null>;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,

  login: async (payload) => {
    set({ isLoading: true });

    try {
      const { access_token } = await loginAction(payload);
      set({ accessToken: access_token });
      await get().fetchCurrentUser();
    } catch (error) {
      set({ user: null, accessToken: null });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCurrentUser: async () => {
    const token = get().accessToken;

    if (!token) {
      set({ user: null });
      return null;
    }

    try {
      const currentUser = await getMe(token);
      set({ user: currentUser });
      return currentUser;
    } catch (error) {
      set({ user: null, accessToken: null });
      throw error;
    }
  },

  refreshSession: async () => {
    try {
      const { access_token } = await refreshAction();
      set({ accessToken: access_token });
      return access_token;
    } catch {
      set({ user: null, accessToken: null });
      return null;
    }
  },

  initializeAuth: async () => {
    set({ isLoading: true });

    try {
      if (get().accessToken) {
        await get().fetchCurrentUser();
        return;
      }

      const refreshedToken = await get().refreshSession();
      if (refreshedToken) {
        await get().fetchCurrentUser();
      }
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    let token = get().accessToken;

    try {
      if (!token) {
        token = await get().refreshSession();
      }

      if (token) {
        await logoutAction(token);
      }
    } finally {
      set({ user: null, accessToken: null, isLoading: false });
    }
  },
}));

export { useAuthStore };
