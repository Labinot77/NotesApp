"use client";

import { logout } from "@/acitons/auth";
import { Button } from "./ui/button";

const Logout = () => {
  return (
    <Button variant="destructive" onClick={() => logout()} className="px-4 py-2">
        Logout
    </Button>
  );
};

export default Logout;