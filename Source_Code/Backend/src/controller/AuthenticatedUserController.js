import Movie from '../model/Movie.js';
import Food from '../model/Food.js';
import Drink from '../model/Drink.js';
import MovieShowtime from '../model/MovieShowtime.js';
import ShowtimeSpot from '../enum/ShowtimeSpot.js';
import { parseToken } from '../utils/JwtVerifier.js';
import User from '../model/User.js';
import Ticket from '../model/Ticket.js';

class AuthenticatedUserController {
    // get the movies
    async getMovies(req, res) {
        try {
            const movies = await Movie.find()

            const body = {
                success: true,
                message: "Get movies successfully",
                data: movies
            }

            res.status(200).json(body);
        }
        catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }



    async getMovieById(req, res) {
        const { id } = req.params;
        try {
            const movie = await Movie.findById(id)

            const body = {
                success: true,
                message: "Get movies successfully",
                data: movie
            }

            res.status(200).json(body);
        }
        catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }

    async getMovieShowtime(req, res) {
        const { id } = req.params;
        try {
            const showtimes = await MovieShowtime.find({ movie: id })
                .select('theaterRoom showtimeSpot showtimeDate')
                .populate('theaterRoom')


            const showtimeMap = {};

            //The result will be a map where each key represents a showtimeDate,
            // and the corresponding value is an array of showtimeSpot values associated with that date.
            showtimes.forEach((showtime) => {
                const { showtimeDate, showtimeSpot } = showtime;
                // Format the date and extract only the date part
                const formattedDate = new Date(showtimeDate).toISOString().split("T")[0];

                if (showtimeMap[formattedDate]) {
                    // Append the showtimeSpot to the existing array
                    showtimeMap[formattedDate].push(showtimeSpot);
                    console.log("here");
                    console.log(showtimeMap);
                } else {
                    // Create a new array for the showtimeSpot
                    showtimeMap[formattedDate] =  [showtimeSpot];
                    console.log("there");
                    console.log(showtimeMap);

                }
            });

            const showtimeArr = []
            Object.keys(showtimeMap).forEach((date) => {
                // Access the value using object[key]
                showtimeArr.push({
                    date: date,
                    spots: showtimeMap[date],
                })
              });

            console.log(showtimeArr);

            const body = {
                success: true,
                message: "Get showtimes successfully",
                data: showtimeArr
            }
            res.status(200).json(body);

        }
        catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }


    async getTheaterRoomByShowtime(req, res) {
        const { movieId, showtimeDate, showtimeSpot } = req.query;
        console.log(req.params);
        try {
            const showtimes = await MovieShowtime.find({ movie: movieId, showtimeDate: new Date(showtimeDate), showtimeSpot: showtimeSpot })
                .select('theaterRoom showtimeSpot showtimeDate')
                .populate('theaterRoom')

            // the logic only accept 1 showtime of a movie at a certain time
            const firstShowtime = showtimes[0]

            const theaterRoom = firstShowtime.theaterRoom
            const tickets = await Ticket.find({movieShowtime: firstShowtime._id})



        

            const body = {
                success: true,
                message: "Get showtimes successfully",
                data: {
                    theaterRoom: theaterRoom,
                    tickets: tickets
                }
            }
            res.status(200).json(body);

        }
        catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }
    // get the foods
    async getFoods(req, res) {
        try {
            const foods = await Food.find();

            const body = {
                success: true,
                message: "Get foods successfully",
                data: foods
            }

            res.status(200).json(body);
        }
        catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }

    // get the drinks
    async getDrinks(req, res) {
        try {

            const drinks = await Drink.find()

            const body = {
                success: true,
                message: "Get drinks successfully",
                data: drinks
            }
            res.status(200).json(body)
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }

            res.status(400).json(body)
        }
    }

    // get all showtimes on a specific date
    async getShowtimes(req, res) {
        const { date } = req.body
        try {
            const allShowtimesAtDate = await MovieShowtime.find({ showtimeDate: date }).select('-tickets')

            const showtimeBySpot = {}

            // group the showtimes by showtimeSpot
            for (let i = 0; i < showtimeBySpot.length; i++) {
                const spot = showtimes[i]
                const showtimes = allShowtimesAtDate.filter(showtime => showtime.showtimeSpot === spot)
                showtimeBySpot[spot] = showtimes
            }

            const body = {
                success: true,
                message: "Get showtimes successfully",
                data: showtimeBySpot
            }

            res.status(200).json(body)


        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body)
        }
    }


    async getUserInfo(req, res) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Bearer token missing or invalid',
            });
        }

        const token = authorizationHeader.split(' ')[1];
        const { id, role } = parseToken(token)
        const user = await User.findById(id)

        delete user.password
        const body = {
            success: true,
            message: "Get user info successfully",
            data: user

        }
        res.status(200).json(body)
    }

    async updateInfo(req, res) {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Bearer token missing or invalid',
            });
        }

        const {
            phoneNumber,
            bio,
            avatar,
            coverImage
        } = req.body

        const token = authorizationHeader.split(' ')[1];
        const { id, role } = parseToken(token)
        const user = await User.findById(id)

        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.bio = bio
        if (avatar) user.avatar = avatar
        if (coverImage) user.coverImage = coverImage

        await user.save()

        console.log('after saving');
        console.log(req.body);
        console.log(user);
        const body = {
            success: true,
            message: "Update user info successfully",
        }

        res.status(200).json(body)
    }
}


export default new AuthenticatedUserController();