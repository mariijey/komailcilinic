// types
import { MenuProps } from "types/menu";
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState: MenuProps = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true,
  userInfo: {
    id: 0,
    email: "",
    name: null,
    username: "",
    active: false,
    createdAt: "",
    updatedAt: null,
  },
  userAccess: { roles: [] },
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
    saveUser(state, action) {
      state.userInfo = action.payload.userInfo;
      state.userAccess = { roles: action.payload.userAccess };
    },
  },
});

export default menu.reducer;

export const {
  activeItem,
  activeComponent,
  openDrawer,
  openComponentDrawer,
  saveUser,
} = menu.actions;
