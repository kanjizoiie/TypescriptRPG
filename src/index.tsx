import * as React from "react";
import { Application } from "./App";
import { createRoot } from 'react-dom/client';
import "./index.scss";

const root = createRoot(document.getElementById('root'));
root.render(<Application />);