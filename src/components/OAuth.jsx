import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const OnGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // check for user
      const user = result.user
      const userRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userRef)
      // if user doesnt exist , create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }
  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'Up' : 'In'}</p>
      <button className='socialIconDiv' onClick={OnGoogleClick}>
        <img src={googleIcon} alt='Google' className='socialIconImg' />
      </button>
    </div>
  )
}

export default OAuth
