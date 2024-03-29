"use client";

import { useEffect, useState } from "react";

import React from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin = typeof window.location.origin ? window.location.origin : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";

  return origin;
};
