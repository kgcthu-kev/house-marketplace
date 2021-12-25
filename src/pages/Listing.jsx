import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'
import shareIcon from '../assets/svg/shareIcon.svg'

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const getFetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    getFetchListing()
  }, [navigate, params.listingId])
  return <div>Listing</div>
}

export default Listing
