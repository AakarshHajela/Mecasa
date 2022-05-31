import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/firebase-analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJrpI8kwXgh9gY0eRm3jMmIH7AykFFD5Q",
  authDomain: "mecasa-fc26b.firebaseapp.com",
  projectId: "mecasa-fc26b",
  storageBucket: "mecasa-fc26b.appspot.com",
  messagingSenderId: "332248383326",
  appId: "1:332248383326:web:f9d421b105e2043d4599cf",
  measurementId: "G-F6556PWWMB"
};
class FireBase {
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.analytics = this.app.analytics(); //firebase.analytics();
    this.auth = firebase.auth();
    this.user = firebase.auth().currentUser;

    this.db = this.app.firestore();
    this.storage = firebase.storage();

    this.ImageRef = this.db.collection("images");
    this.usersRef = this.db.collection("users");
    // this.hashRef = this.db.collection("hash");
    this.GoogleProviderID = new firebase.auth.GoogleAuthProvider().providerId;
    // this.PhoneProviderID = new firebase.auth.PhoneAuthProvider().providerId;
  }

  getImageOption = async (option) => {
    var res;
    await this.ImageRef.where('option','==',option).get().then((result) => res = result);
    return res;
  }

  getURL = async (name) => {
    this.storage.ref("p3.jpg").getDownloadURL().then((url) => console.log(url));
  }

  getImages = (folder,file) => {
    this.storage.ref(`/${folder}/${file}`).put(file)
      .on("state_changed", alert("success"), alert, () => {
  
        // Getting Download Link
        this.storage.ref(folder).child(file).getDownloadURL()
          .then((url) => {
            return url;
          })
      });
  }

  isLoggedIn = () => {
    return this.user ? true : false;
  };
  // componentDidMount = () => {
  //   console.log("lofffff", this.user);
  //   this.auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       this.setState = {
  //         isLoggedIn: true,
  //       };
  //       console.log("lofffff", user);
  //     } else {
  //       this.setState = {
  //         isLoggedIn: false,
  //       };
  //       console.log("hjhjhjh");
  //     }
  //   });
  // };

  // get token
  getToken = () => {
    return new Promise((resolve, reject) => {
      if (this.auth.currentUser) {
        this.auth.currentUser.getIdToken(true).then((token) => {
          resolve(token);
        });
      } else {
        resolve(null);
      }
    });
  };

  getUser = () => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
    return this.user;
  };

  createUser = async (email, password) => {
    try {
      const res = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.user = res.user;
      return { success: true, error: null };
      // console.log("creare user success", res);
    } catch (error) {
      var errorMessage = error.message;
      return { success: false, error: errorMessage };
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log("create user error", error);
    }
  };

  signInUser = async (email, password) => {
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      // console.log("sign in  user", res);
      this.user = res.user;

      return { success: true, error: null };
    } catch (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      // console.log("sign in user error", error);
      return { success: false, error: errorMessage };
    }
  };

  signOutUser = async () => {
    try {
      this.user = null;
      await this.auth.signOut();
      // console.log("Sign out successful");
    } catch (error) {
      // console.log("error signing out", error);
    }
  };


  getInbox = (to) => {
    //if(this.businessFormRef.where('to','==',to).where('message','==',this.hashRef.where())
    return this.businessFormRef.where('to','==',to).orderBy('timestamp','desc').get();
  }

  getHash = (to) => {
    //if(this.businessFormRef.where('to','==',to).where('message','==',this.hashRef.where())
    return this.hashRef.where('to','==',to).get();
  }

  getHashFrom = (from) => {
    return this.hashRef.where('from','==',from).get();
  }

  getSent = (from) => {
    return this.businessFormRef.where('from','==',from).orderBy('timestamp','desc').get();
  }

  // addBusinessForm = async (id, record) => {
  //   return this.businessFormRef.doc(id).set({ ...record });
  // };

  updateBusinessForm = async (id, record) => {
    return this.businessFormRef.doc(id).update(record);
  };

  deleteEmail = async(id) => {
    return this.businessFormRef.doc(id).delete();
  }

  getCipher = async(id, timestamp) => {
    return this.hashRef.where('id','==',id).where('timestamp','==',timestamp).get();
  }

  getUserIdfromEmail = async(email) => {
    return this.usersRef.where('email','==',email).get();
  }

  deleteCipher = async(id,timestamp) => {
    var ciph = await this.hashRef.where('id','==',id).where('timestamp','==',timestamp);
    ciph.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  }

  // getDocId = async(from,to,timestamp) => {
  //   const doc = await this.businessFormRef.where('from','==',from).where('to','==',to).get();
  //   var id;
  //   doc.forEach(element => {
  //     if(element.timestamp === timestamp)
  //       id = element.docId;
  //   });
  //   return id;
  // }

  // deleteBusinessForm = async (id) => {
  //   return this.businessFormRef.doc(id).delete();
  // };

  fromSecondsToTimestamp = (seconds, nanoseconds = 0) => {
    if (!seconds) return firebase.firestore.Timestamp.now();
    const newTimestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
    return newTimestamp;
  };

  resetPassword = async (email) => {
    return this.auth.sendPasswordResetEmail(email);
  };

  addUserRecord = (record) => {
    return this.usersRef
      .doc(this.user.uid)
      .set({ ...record, UserID: this.user.uid, Url: "" });
  };
  getUserProfileDetails = (id) => {
    return this.usersRef.doc(id).get();
  };
  getUserProfileImage = () => {
    return this.storage;
  };
  updateProfileDetails = (id, details) => {
    return this.usersRef.doc(id).update(details);
  };
  sendEmailVerification = () => {
    var user = this.getUser();
    try {
      if (!user.emailVerified) {
        user.sendEmailVerification();
        return { success: true, error: null };
      } else {
        // console.log("Already verified");
        return { verified: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}
export default FireBase;
