import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chemicals: JSON.parse(localStorage.getItem("chemicals")) || [
    {
      id: 1,
      name: "Hydrochloric Acid",
      formula: "HCI",
    },
    {
      id: 2,
      name: "Sodium Chloride",
      formula: "NaCl",
    },
    {
      id: 3,
      name: "Sulfuric Acid",
      formula: "H2SO4",
    },
    {
      id: 4,
      name: "Ammonia",
      formula: "NH3",
    },
    {
      id: 5,
      name: "Ethanol",
      formula: "C2H5OH",
    },
  ],
};

const ChemicallSlice = createSlice({
  name: "chemicals",
  initialState,
  reducers: {
    addchemical(state, action) {
      const biggestID =
        state.chemicals.reduce((a, b) => Math.max(b.id, a), 0) + 1;
      const newchemical = {
        id: biggestID,
        name: action.payload.name,
        formula: action.payload.formula,
      };
      state.chemicals.push(newchemical);
      localStorage.setItem("chemicals", JSON.stringify(state.chemicals));
    },
    deletechemical(state, action) {
      state.chemicals = state.chemicals.filter(
        (chemical) => chemical.id !== action.payload
      );
      localStorage.setItem("chemicals", JSON.stringify(state.chemicals));
    },

    editchemical(state, action) {
      state.chemicals = state.chemicals.map((item) =>
        item.id === action.payload.id
          ? { ...item, formula: action.payload.formula }
          : item
      );
      localStorage.setItem("chemicals", JSON.stringify(state.chemicals));
    },

    editchemical(state, action) {
      state.chemicals = state.chemicals.map((item) =>
        item.id === action.payload.id
          ? { ...item, name: action.payload.name }
          : item
      );
      localStorage.setItem("chemicals", JSON.stringify(state.chemicals));
    },
    editchemicalformula(state, action) {
      state.chemicals = state.chemicals.map((item) =>
        item.id === action.payload.id
          ? { ...item, formula: action.payload.formula }
          : item
      );
      localStorage.setItem("chemicals", JSON.stringify(state.chemicals));
    },
    findchemical(state, action) {
      state.chemicals = state.chemicals.filter(
        (chemical) => chemical.name == action.payload
      );
    },
  },
});

export const {
  addchemical,
  deletechemical,
  editchemical,
  findchemical,
  editchemicalformula,
} = ChemicallSlice.actions;
export default ChemicallSlice.reducer;
