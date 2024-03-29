import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "../src/config"
import firebase from "firebase";

Vue.use(Vuex);
firebase.initializeApp({
    apiKey: config.fbConfig.apiIKey,
    authDomain: config.fbConfig.authDomain,
    databaseURL: config.fbConfig.dbURL.dbURL,
    storageBucket: config.fbConfig.storageBucket
});

export default new Vuex.Store({
    state: {
        authToken: null,
        userID: null,
        adminID: null,
        singlePost: [],
        singleComment: [],
        loadedSales: [],
        loadedRentals: [],
        loadedImages: [],
        loadedComments: [],
        loadedNews: []
    },
    getters: {
        currentPost: state => route => {
            if (route.name === "salesdetails") {
                state.singlePost = state.loadedSales.find(x => x.id === route.params.id);
            } else if (route.name === "rentalsdetails") {
                state.singlePost = state.loadedRentals.find(x => x.id === route.params.id);
            } else {
                state.singlePost = state.loadedNews.find(x => x.id === route.params.id);
            }

            return state.singlePost;
        },
        currentComment: state => commentId => {
            return state.singleComment = state.loadedComments.find(x => x.id === commentId);
        },
        loadedSales(state) {
            return state.loadedSales;
        },
        loadedRentals(state) {
            return state.loadedRentals;
        },
        loadedNews(state) {
            return state.loadedNews.reverse();
        },
        loadedComments(state) {
            return state.loadedComments.reverse();
        },
        loadedImages(state) {
            return state.loadedImages;
        },
        isAuthenticated(state) {
            return state.authToken != null;
        },
        isAdmin(state) {
            return state.userID != null && state.userID === state.adminID;
        }
    },
    mutations: {
        SET_LOADED_SALES(state, loadedSales) {
            state.loadedSales = loadedSales;
        },
        SET_LOADED_RENTALS(state, loadedRentals) {
            state.loadedRentals = loadedRentals;
        },
        SET_LOADED_NEWS(state, loadedNews) {
            state.loadedNews = loadedNews;
        },
        SET_LOADED_COMMENTS(state, loadedComments) {
            state.loadedComments = loadedComments;
        },
        FILTER_DATA(state, data) {
            if (data.filter === "type") {
                if (data.page === "sales") {
                    state.loadedSales = state.loadedSales.filter(
                        item => item.propertyType.toLowerCase() === data.event.target.getAttribute("value").toLowerCase()
                    )
                } else {
                    state.loadedRentals = state.loadedRentals.filter(
                        item => item.propertyType.toLowerCase() === data.event.target.getAttribute("value").toLowerCase()
                    )
                }
            } else if (data.filter === "price") {
                if (data.page === "sales") {
                    if (data.event.target.getAttribute("value").toLowerCase() === "to 20000") {
                        state.loadedSales = state.loadedSales.filter(
                            item => item.price <= 20000
                        )
                    } else if (data.event.target.getAttribute("value").toLowerCase() === "from 20000 to 50000") {
                        state.loadedSales = state.loadedSales.filter(
                            item => item.price >= 20000 && item.price <= 50000
                        )
                    } else if (data.event.target.getAttribute("value").toLowerCase() === "from 50000 to 100000") {
                        state.loadedSales = state.loadedSales.filter(
                            item => item.price >= 50000 && item.price <= 100000
                        )
                    } else {
                        state.loadedSales = state.loadedSales.filter(
                            item => item.price >= 100000
                        )
                    }
                } else {
                    if (data.event.target.getAttribute("value").toLowerCase() === "to 100") {
                        state.loadedRentals = state.loadedRentals.filter(
                            item => item.price <= 100
                        )
                    } else if (data.event.target.getAttribute("value").toLowerCase() === "from 100 to 500") {
                        state.loadedRentals = state.loadedRentals.filter(
                            item => item.price >= 100 && item.price <= 500
                        )
                    } else if (data.event.target.getAttribute("value").toLowerCase() === "from 500 to 1000") {
                        state.loadedRentals = state.loadedRentals.filter(
                            item => item.price >= 500 && item.price <= 1000
                        )
                    } else {
                        state.loadedRentals = state.loadedRentals.filter(
                            item => item.price >= 1000
                        )
                    }
                }
            } else {
                if (data.page === "sales") {
                    state.loadedSales = state.loadedSales.filter(
                        item => item.location.toLowerCase() === data.event.target.getAttribute("value").toLowerCase()
                    )
                } else {
                    state.loadedRentals = state.loadedRentals.filter(
                        item => item.location.toLowerCase() === data.event.target.getAttribute("value").toLowerCase()
                    )
                }
            }
        },
        SET_IMAGES(state, loadedImages) {
            state.loadedImages = loadedImages;
        },
        SET_TOKEN(state, token) {
            state.authToken = token;
        },
        SET_USER_ID(state, localID) {
            state.userID = localID;
        },
        SET_ADMIN_ID(state, adminID) {
            state.adminID = adminID;
        },
        CLEAR_TOKEN(state) {
            state.authToken = null;
        },
        CLEAR_ADMIN_STATUS(state) {
            state.admin = null;
        }
    },
    actions: {
        getPosts(context, postType) {
            return axios.get(config.fbConfig.dbURL + postType + ".json")
                .then(response => {
                    const loadedPosts = [];
                    for (const key in response.data) {
                        if (response.data[key].gallery) {
                            response.data[key].gallery = response.data[key].gallery.split(",");
                        }
                        loadedPosts.push({ ...response.data[key], id: key });
                    }

                    if (postType === "news") {
                        context.commit("SET_LOADED_NEWS", loadedPosts);
                    } else if (postType === "sales") {
                        context.commit("SET_LOADED_SALES", loadedPosts);
                    } else {
                        context.commit("SET_LOADED_RENTALS", loadedPosts);
                    }
                })
                .catch(e => console.error(e));
        },
        getComments(context) {
            return axios.get(config.fbConfig.dbURL + "/comments.json")
                .then(response => {
                    const loadedComments = [];
                    for (const key in response.data) {
                        loadedComments.push({ ...response.data[key], id: key });
                    }

                    context.commit("SET_LOADED_COMMENTS", loadedComments);
                })
                .catch(e => console.log(e));
        },
        addPost(context, post) {
            return axios
                .post(config.fbConfig.dbURL + post.postType + ".json?auth=" + context.state.authToken, post)
                .then(result => {
                    return { status: result.status };
                })
                .catch(error => {
                    return {
                        status: error.response.status,
                        message: error.response.data.error.message
                    };
                });
        },
        addFilesToStorage(context, images) {
            return uploadFiles(images).then((imagesArr) => {
                context.commit('SET_IMAGES', imagesArr);

                return ({ status: 'ok' });
            }).catch(err => {
                console.log(err);
            });

        },
        addComment(context, post) {
            return axios
                .post(config.fbConfig.dbURL + "comments.json?auth=" + context.state.authToken, post)
                .then(result => {
                    return { status: result.status };
                })
                .catch(error => {
                    return {
                        status: error.response.status,
                        message: error.response.data.error.message
                    };
                });
        },
        getAdminStatus(context) {
            return axios.get(config.fbConfig.dbURL + "/admin.json")
                .then(response => {
                    context.commit("SET_ADMIN_ID", response.data._id);
                })
                .catch(e => console.log(e));
        },
        authenticateUser(context, authData) {
            let authUrl = config.fbConfig.authDomain + "verifyPassword?key=" + config.fbConfig.apiIKey;

            if (!authData.isLogin) {
                authUrl = config.fbConfig.authDomain + "signupNewUser?key=" + config.fbConfig.apiIKey;
            }

            return axios.post(authUrl, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }).then(result => {
                context.commit('SET_TOKEN', result.data.idToken);
                context.commit('SET_USER_ID', result.data.localId);
                context.dispatch('getAdminStatus');
                localStorage.setItem("token", result.data.idToken);
                localStorage.setItem("localId", result.data.localId);
                localStorage.setItem('tokenExpiration', new Date().getTime() + +result.data.expiresIn * 1000);
                return { status: result.status };
            })
                .catch(error => {
                    return {
                        status: error.response.status,
                        message: error.response.data.error.message
                    };
                });
        },
        initAuth(context) {
            let token = localStorage.getItem('token');
            let localId = localStorage.getItem('localId');
            let expirationDate = localStorage.getItem("tokenExpiration");

            if (token) {
                context.commit('SET_TOKEN', token);
            }
            if (localId) {
                context.commit('SET_USER_ID', localId);
                context.dispatch('getAdminStatus');
            }

            if (expirationDate) {
                if (new Date().getTime() > +expirationDate || !token) {
                    context.dispatch('logOut');
                    return;
                }
            }
        },
        logOut(context) {
            context.commit('CLEAR_TOKEN');
            context.commit('CLEAR_ADMIN_STATUS');
            localStorage.removeItem("token");
            localStorage.removeItem("localId");
            localStorage.removeItem("tokenExpiration");
        }
    }
});

async function uploadFiles(images) {
    try {
        let imagesArr = [];

        for (var i = 0; i < images.files.length; i++) {
            firebase
                .storage()
                .ref("/images/" + images.files[i].name)
                .put(new Blob([images.files[i]], { type: "image/jpeg" }))
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        imagesArr.push(url);
                    });
                })
                .catch(err => console.log(err));
        }

        return imagesArr;
    } catch (e) {
        console.log(e);
        throw e;
    }
}