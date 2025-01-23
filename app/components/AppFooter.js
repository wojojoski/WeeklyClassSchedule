"use client";

import { Footer } from "flowbite-react";

export default function AppFooter() {
  return (
    <Footer container>
      <Footer.Copyright href="#" by="Next.js Laboratory Project" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
