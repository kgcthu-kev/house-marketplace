import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

function Offers() {
  const [listings, setLisings] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchListings = async () => {
    try {
      // Get ref
      const listingsRef = collection(db, 'listings')

      // create query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10)
      )

      // execute query
      const querySnap = await getDocs(q)
      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setLisings(listings)
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch the data')
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])
  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main className='categoryListings'>
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
              ></ListingItem>
            ))}
          </main>
        </>
      ) : (
        <p>There are no offer.</p>
      )}
    </div>
  )
}

export default Offers
