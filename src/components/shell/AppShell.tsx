"use client";

import { type ReactNode, useState } from "react";
import {
  AppShell as MantineAppShell,
} from "@mantine/core";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { MobileDrawer } from "./Navigation/MobileDrawer";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <MantineAppShell
      header={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Header onMenuClick={() => setDrawerOpened(true)} />
      </MantineAppShell.Header>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>

      <Footer />

      <MobileDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      />
    </MantineAppShell>
  );
}
