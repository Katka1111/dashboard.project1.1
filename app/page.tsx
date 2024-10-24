'use client';

import React from 'react';
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <SignedOut>
        <SignIn />
        <SignUp />
      </SignedOut>
      <SignedIn>
        <p>You are signed in!</p>
      </SignedIn>
    </div>
  );
}
