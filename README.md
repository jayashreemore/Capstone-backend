# Capstone-backend
Backend routes

//auth routes // /api/signup router.post("/signup", signup);

// /api/signin router.post("/signin", signin);

// /api/signin router.get("/logout", logout);

// /api/userprofile router.get("/me", isAuthenticated, userProfile);

// /api/users router.get("/users", userList);

// /api/users/:id router.get("/user/:id", showSingleUser);

// /api/delete/user/:id router.delete("/delete/user/:id", deleteUser);

// /api/users/:id router.put("/update/user/:id", updateUser);

// /api/signup router.post("/contactus", contactus);

//blog routes router.post("/post/create", isAuthenticated, isAdmin, createPost); router.get("/posts/show", showPost); router.get("/post/:id", showSinglePost); router.delete("/delete/post/:id", isAuthenticated, isAdmin, deletePost); router.put("/update/post/:id", isAuthenticated, isAdmin, updatePost); router.put("/comment/post/:id", isAuthenticated, addComment); router.put("/addlike/post/:id", isAuthenticated, addLike); router.put("/removelike/post/:id", isAuthenticated, removeLike);

// /api/signup router.post("/subscription", subscription);