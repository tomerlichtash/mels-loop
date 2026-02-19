"use client";

import { type ReactNode, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { MobileDrawer } from "../Navigation/MobileDrawer";
import type { NavItem, FooterLinkColumn } from "../types";
import styles from "./AppShell.module.css";

interface AppShellProps {
  children: ReactNode;
  navItems: NavItem[];
  footerLinks?: FooterLinkColumn[];
}

export function AppShell({ children, navItems, footerLinks }: AppShellProps) {
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <div className={styles.shell}>
      <Header
        onMenuClick={() => setDrawerOpened(true)}
        navItems={navItems}
      />

      <main className={styles.main}>{children}</main>

      <Footer linkColumns={footerLinks} />

      <MobileDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        navItems={navItems}
      />
    </div>
  );
}
