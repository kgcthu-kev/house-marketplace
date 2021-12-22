import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

function Category() {
  const [listings, setLisings] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  const fetchListings = async () => {
    try {
      // Get ref
      const listingsRef = collection(db, 'listings')

      // create query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
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
        <p className='pageHeader'>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
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
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
