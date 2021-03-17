import { createContext } from "preact";
import { JSXInternal } from "preact/src/jsx";
import BottomRow from "./BottomRow/BottomRow";
import MiddleRow from "./MiddleRow/MiddleRow";
import TopRow from "./TopRow/TopRow";
import * as styles from './App.css';

interface HassProps {
  hass: Record<string, unknown>; // Equivalent to Object basically
  narrow: boolean;
  route: Record<string, unknown>;
  panel: Record<string, unknown>; // The configuration for this panel
}

function App({ hass, narrow, route, panel }: HassProps): JSXInternal.Element {
  const HassContext = createContext(hass);

  return (
    <div className={styles.gridContainer}>
      <TopRow />
      <MiddleRow />
      <BottomRow />
    </div>
  );
}

export default App;
