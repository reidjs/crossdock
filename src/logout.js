import useFirebase from './useFirebase';
import fb from 'firebase/app';
export default function() {
  fb.auth().signOut().then(function(result) {
    console.log(result)
  })
}
