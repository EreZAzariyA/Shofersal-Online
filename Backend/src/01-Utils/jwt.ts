import { Request } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import CustomerModel from "../03-models/customer-model";

const secretKey = "I-Love-Kittens-And-Puppies";

function getNewToken(customer: CustomerModel): string {
    const payload = { customer }; // payload = object containing our user.
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {

            // If missing authorization header:
            if (!request.headers.authorization) {
                resolve(false);
                return;
            }

            // Here we have authorization header...

            // authorization format: "Bearer the-token"
            //                        01234567
            const token = request.headers.authorization.substring(7);

            // If missing token: 
            if (!token) {
                resolve(false);
                return;
            }

            // Here we have a token...

            // Verify token: 
            jwt.verify(token, secretKey, (err: VerifyErrors, payload: JwtPayload) => { // payload = { user: { firstName: ___, } }

                // If token invalid (expires / wrong format...):
                if (err) {
                    resolve(false);
                    return;
                }

                // Token is valid: 
                resolve(true);
            });

        }

        catch (err: any) {
            reject(err);
        }
    });
}

// Must call that function only when token is verified:
function getCustomerFromToken(request: Request): CustomerModel {

    // Get the token from the request:
    const token = request.headers.authorization.substring(7);

    // Extract the payload: 
    const payload = jwt.decode(token);

    // Extract the user form the payload:
    const customer = (payload as any).customer;

    return customer;
}

export default {
    getNewToken,
    verifyToken,
    getCustomerFromToken
};
