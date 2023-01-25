import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {

    static async injectDB(conn) {
        // if already has a db connection -> return
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews") // get db called reviews, then get collection called reviews
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    // static async getReview

    // static async updateReview




}