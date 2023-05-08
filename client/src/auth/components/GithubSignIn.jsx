import auth from 'firebaseConfig';
import useAuthUser from 'auth/hooks/useAuthUser';
import ROLES from 'auth/Roles';
import { GithubAuthProvider, getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import GithubButton from 'react-github-login-button';

function GithubSignIn() {
  const { addUserToBackEnd, setAuthError } = useAuthUser();

  const signIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userInfo = getAdditionalUserInfo(userCredential);
      if (userInfo.isNewUser) {
        await addUserToBackEnd(userCredential.user.accessToken, [ROLES.User]);
      }
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    }
  };

  return (
    <div className="container signin">
      <GithubButton type="dark" onClick={() => signIn()}>
        GitHub
      </GithubButton>
    </div>
  );
}

export default GithubSignIn;
