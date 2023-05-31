import TheaterRoom from '../model/TheaterRoom.js';
import Movie from '../model/Movie.js';
import Food from '../model/Food.js';
import Drink from '../model/Drink.js';
import User from '../model/User.js';
import MovieShowtime from '../model/MovieShowtime.js';
import Ticket from '../model/Ticket.js';
import ShowtimeSpot from '../enum/ShowtimeSpot.js';
class AdminController {
    async createTheaterRoom(req, res) {
        const requestBody = req.body;

        try {
            // create and save a new theater room
            const theaterRoom = await TheaterRoom.create(requestBody);

            const body = {
                success: true,
                message: "Create theater room successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }
    async getTheaterRooms(req, res) {
        try {
            const theaterRooms = await TheaterRoom.find();
            const body = {
                success: true,
                message: "Get theater rooms successfully",
                data: theaterRooms
            }
            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async updateTheaterRoom(req, res) {
        const body = req.body;
        const id = req.params.id;

        const theaterRoom = await TheaterRoom.findById(id);

        if (!theaterRoom) {
            const body = {
                success: false,
                message: "Theater room not found"
            }
            res.status(404).json(body);
        }

        if (body.name) theaterRoom.name = body.name
        if (body.rowNum) theaterRoom.rows = body.rows
        if (body.setPerRows) theaterRoom.setPerRows = body.setPerRows
        if (body.image) theaterRoom.image = body.image

        try {
            await theaterRoom.save();

            const body = {
                success: true,
                message: "Update theater room successfully"
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

    async deleteTheaterRoom(req, res) {
        const id = req.params.id;

        try {
            await TheaterRoom.findByIdAndDelete(id);

            const body = {
                success: true,
                message: "Delete theater room successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async createMovie(req, res) {
        const {
            title,
            description,
            releaseDate,
            duration,
            genre,
            country,
            directors,
            actors,
            poster,
        } = req.body;

        try {
            // create and save a new movie
            const movie = await Movie.create({
                title,
                description,
                releaseDate,
                duration,
                genre,
                country,
                directors,
                actors,
                poster,
            });

            const body = {
                success: true,
                message: "Create movie successfully"
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
    async updateMovie(req, res) {
        const body = req.body;
        const id = req.params.id;

        const movie = await Movie.findById(id);

        if (!movie) {
            const body = {
                success: false,
                message: "Movie not found"
            }
            res.status(404).json(body);
        }

        if (body.name) movie.name = body.name;
        if (body.description) movie.description = body.description;
        if (body.releaseDate) movie.releaseDate = body.releaseDate;
        if (body.duration) movie.duration = body.duration;
        if (body.genre) movie.genre = body.genre;
        if (body.director) movie.director = body.director;
        if (body.cast) movie.cast = body.cast;
        if (body.poster) movie.poster = body.poster;


        try {
            await movie.save();
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }

    async deleteMovie(req, res) {
        const id = req.params.id;

        try {
            await Movie.findByIdAndDelete(id);
            const body = {
                success: true,
                message: "Delete movie successfully"
            }
            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }
    async createFood(req, res) {
        const {
            name,
            price,
            description,
            image
        } = req.body;

        try {
            // create and save a new food
            const food = await Food.create({
                name,
                price,
                description,
                image,

            });

            const body = {
                success: true,
                message: "Create food successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async updateFood(req, res) {
        const body = req.body;
        const id = req.params.id;

        const food = await Food.findById(id);

        if (!food) {
            const body = {
                success: false,
                message: "Food not found"
            }
            res.status(404).json(body);
        }

        if (body.name) food.name = body.name;
        if (body.price) food.price = body.price;
        if (body.description) food.description = body.description;
        if (body.image) food.image = body.image;

        try {
            // update the food
            await food.save();
            const body = {
                success: true,
                message: "Update food successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }

    async deleteFood(req, res) {
        const id = req.params.id;
        try {
            await Food.findByIdAndDelete(id);
            const body = {
                success: true,
                message: "Delete food successfully"
            }
            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }
    async createDrink(req, res) {
        const {
            name,
            price,
            description,
            image,
        } = req.body;

        try {
            // create and save a new drink
            const drink = await Drink.create({
                name,
                price,
                description,
                image
            });

            const body = {
                success: true,
                message: "Create rink successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async updateDrink(req, res) {
        const body = req.body;
        const id = req.params.id;

        const drink = await Drink.findById(id);

        if (!Drink) {
            const body = {
                success: false,
                message: "Food not found"
            }
            res.status(404).json(body);
        }

        if (body.name) drink.name = body.name;
        if (body.price) drink.price = body.price;
        if (body.description) drink.description = body.description;
        if (body.category) drink.category = body.category;
        if (body.inStock) drink.inStock = body.inStock;
        if (body.image) drink.image = body.image;

        try {
            // update the food
            await drink.save();
            const body = {
                success: true,
                message: "Update food successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }

    async deleteDrink(req, res) {
        const id = req.params.id;
        try {
            await Drink.findByIdAndDelete(id);
            const body = {
                success: true,
                message: "Delete drink successfully"
            }
            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }

    }
    async createStaff(req, res) {
        const {
            firstname,
            lastname,
            email,
            password,
        } = req.body;

        try {
            // create and save a new staff
            const staff = await User.create({
                firstname,
                lastname,
                email,
                password,
            });

            const body = {
                success: true,
                message: "Create staff successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async getStaffs(req, res) {


        try {
            // create and save a new staff
            const staffs = await User.find({ role: "STAFF" }).select("-password")

            const body = {
                success: true,
                message: "Get staffs successfully",
                data: staffs
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async sheduleShowtime(req, res) {
        const { movieId, theaterRoomId, showtimeDate, showtimeSpot, priceRates } = req.body
        console.log(req.body);

        try {
            // check if movie exists
            const movie = await Movie.findById(movieId);
            if (!movie) {
                const body = {
                    success: false,
                    message: "Movie not found"
                }
                res.status(404).json(body);
                return
            }
            // check if theater room exists
            const theaterRoom = await TheaterRoom.findById(theaterRoomId);
            if (!theaterRoom) {
                const body = {
                    success: false,
                    message: "Theater room not found"
                }
                res.status(404).json(body);
                return
            }
            const movieShowTime = new MovieShowtime();
            movieShowTime.movie = movie;
            movieShowTime.theaterRoom = theaterRoom;
            movieShowTime.showtimeDate = showtimeDate;
            movieShowTime.showtimeSpot = showtimeSpot;


            // check if the theater room is available at the spot and date
            const existedShowtimes = await MovieShowtime.find({ theaterRoom: theaterRoomId, showtimeDate: new Date(showtimeDate), showtimeSpot: showtimeSpot });
            
            if (existedShowtimes.length > 0) {
                const body = {
                    success: false,
                    message: "Theater room is not available at the spot and date"
                }
                res.status(404).json(body);
                return
            }

            const tickets = [];
            const rowPrice = []
            for (let i = 0; i < priceRates.length; i++) {
                const priceRate = priceRates[i];
                const { fromRow, toRow, price } = priceRate

                for (let j = fromRow; j <= toRow; j++) {
                    rowPrice[j - 1] = price; // index starts from 0, but first row is 1
                }
            }
            
            for (let i = 0; i < theaterRoom.rowNum; i++) {
                for (let j = 0; j < theaterRoom.seatNumPerRow; j++) {
                    const ticket = new Ticket();
                    ticket.row = i;
                    ticket.column = j;
                    ticket.available = true;
                    ticket.price = rowPrice[i];
                    ticket.movieShowtime = movieShowTime;
                    tickets.push(ticket);
                }
            }

            movieShowTime.tickets = tickets;

            await movieShowTime.save();
            await Ticket.insertMany(tickets);
            const body = {
                success: true,
                message: "Create movie showtime successfully"
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }


    async getShowtimeByTheaterRoomId(req, res) {
        const { theaterRoomId, date } = req.body;

        try {

            const showtimesAtDateByTheaterRoom = await MovieShowtime
                .find({ theaterRoomId, showtimeDate: date })
                .select("-tickets")
                .populate("movie theaterRoom");

            const showtimeBySpot = {};
            for (let i = 0; i < ShowtimeSpot.length; i++) {
                const spot = ShowtimeSpot[i];
                let showtime = showtimesAtDateByTheaterRoom.filter(showtime => showtime.showtimeSpot === spot).pop(); // can only have one showtime at a spot at a date of a theater room
                showtimeBySpot[spot] = showtime;
            }

            const body = {
                success: true,
                message: "Get movie showtime successfully",
                data: showtimeBySpot
            }

            res.status(200).json(body);
        } catch (err) {
            const body = {
                success: false,
                message: err.message
            }
            res.status(400).json(body);
        }
    }

    async getTheaterRoomsForSchedulingMovie(req, res) {
        const { showtimeDate, showtimeSpot } = req.body
        console.log('i got this one: ');
        console.log(req.body);

        const availableRooms = await TheaterRoom.aggregate([
            {
                $lookup: {
                    from: "movie_showtimes",
                    let: { theaterRoomId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$theaterRoom", "$$theaterRoomId"] },
                                        { $eq: ["$showtimeDate", new Date(showtimeDate)] },
                                        { $eq: ["$showtimeSpot", showtimeSpot] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "showtimeRecords"
                }
            },
            {
                $match: {
                    showtimeRecords: { $size: 0 }
                }
            }
        ]);

        availableRooms.forEach(room => delete room.showtimeRecords)
        const body = {
            success: true,
            message: "Get avaiable theater rooms successfully",
            data: availableRooms

        }

        res.status(200).json(body);

    }
}

export default new AdminController();