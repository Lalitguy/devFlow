import { auth } from "@/auth";
import ROUTES from "@/constants/routes";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (session?.user?.id) {
    redirect(ROUTES.PROFILE(session.user.id));
  } else {
    redirect(ROUTES.SIGN_IN);
  }
};

export default Profile;
