import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { checkActionCode } from 'firebase/auth';
import { auth } from '../firebase';
import './styles/ActionHandler.css';

function ActionHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const mode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');

    (async () => {
      try {
        const actionInfo = await checkActionCode(auth, oobCode);

        switch (actionInfo.operation) {
          case 'PASSWORD_RESET':
            navigate(
              `/user/reset-password?email=${actionInfo.data.email}&oobCode=${oobCode}`
            );
            break;

          default:
            throw new Error('Unsupported operation');
        }
      } catch (e) {
        const errorMessage =
          mode === 'resetPassword'
            ? 'There was an error processing your request. Try generating a new password reset link.'
            : 'There was an error processing your request. Try again later.';

        toast.error(errorMessage);
        navigate('/');
      }
    })();
  }, []);

  return <div className="ActionHandler">Redirecting...</div>;
}

export default ActionHandler;
