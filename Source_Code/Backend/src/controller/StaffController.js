import Ticket from "../model/Ticket";
import Order from "../model/Order";
class StaffController {
    async createOrder(req, res) {
        const { foods, drinks, tickets } = req.body;

        try {
            // Create the order
            const order = new Order({
                food: foods.map((food) => ({
                    item: food.item._id,
                    quantity: food.quantity,
                })),
                drink: drinks.map((drink) => ({
                    item: drink.item._id,
                    quantity: drink.quantity,
                })),
                ticket: tickets.map((ticket) => ticket._id),
                totalPrice: 0, // Set the initial total price
            });

            // Calculate the total price
            const foodPrices = foods.reduce(
                (total, food) => total + food.item.price * food.quantity,
                0
            );
            const drinkPrices = drinks.reduce(
                (total, drink) => total + drink.item.price * drink.quantity,
                0
            );
            const ticketPrices = await Ticket.aggregate([
                {
                    $match: {
                        _id: { $in: tickets.map((ticket) => ticket._id) },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalPrice: { $sum: "$price" },
                    },
                },
            ]);

            order.totalPrice = foodPrices + drinkPrices + ticketPrices[0].totalPrice;

            // Save the order
            await order.save();

            // Update ticket status to "purchased"
            await Ticket.updateMany(
                { _id: { $in: tickets.map((ticket) => ticket._id) } },
                { $set: { status: "purchased" } }
            );

            // Send success response
            const response = {
                success: true,
                message: "Order created successfully",
                order,
            };
            res.status(200).json(response);
        } catch (err) {
            // Send error response
            const response = {
                success: false,
                message: err.message,
            };
            res.status(400).json(response);
        }
    }


    // view order history
}


export default new StaffController();