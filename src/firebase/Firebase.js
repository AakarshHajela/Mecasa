import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/firebase-analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVPnxv92jfanKyVm39sWwg6DArUbozGV4",
  authDomain: "explified-app.firebaseapp.com",
  databaseURL: "https://explified-app.firebaseio.com",
  projectId: "explified-app",
  storageBucket: "explified-app.appspot.com",
  messagingSenderId: "901696391731",
  appId: "1:901696391731:web:cc7fdab6bb43b23388b146",
  measurementId: "G-MKQECZX6Q7",
};
class FireBase {
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.analytics = this.app.analytics(); //firebase.analytics();
    this.auth = firebase.auth();
    this.user = firebase.auth().currentUser;

    this.db = this.app.firestore();
    this.storage = firebase.storage();

    this.usersRef = this.db.collection("users");
    this.businessFormRef = this.db.collection("Business Page");
    this.GoogleProviderID = new firebase.auth.GoogleAuthProvider().providerId;
    this.PhoneProviderID = new firebase.auth.PhoneAuthProvider().providerId;
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


  getForms = (status) => {
    return this.businessFormRef.where('status','==',status).orderBy("timestamp", "desc").get();
}

  addBusinessForm = async (record) => {
    return this.businessFormRef.add({ ...record });
  };

  updateBusinessForm = async (id, record) => {
    return this.businessFormRef.doc(id).update(record);
  };

  deleteBusinessForm = async (record) => {
    return this.businessFormRef.doc(record.id).delete();
  };

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
