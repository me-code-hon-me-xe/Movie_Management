import auth from './auth.js';
import admin from './admin.js';
import staff from './staff.js';
import authenticatedUser from './authenticatedUser.js';

function route(app){
    app.use("/api/auth",auth);
    app.use("/api/admin",admin);
    app.use("/api/staff",staff);
    app.use("/api",authenticatedUser);
}

export default route;