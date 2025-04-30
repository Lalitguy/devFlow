import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { auth, signOut } from "@auth";
import React from "react";

const RootPage = async () => {
  console.log(await auth());
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit" className="mt-96 px-5">
          Log out
        </Button>
      </form>
    </div>
  );
};

export default RootPage;
