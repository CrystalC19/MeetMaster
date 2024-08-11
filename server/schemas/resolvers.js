const stripe = require('stripe')('pk_test_51PkaosBQXcWOHffQHW9QTb6hsvDwhuY77FOEWIrrUaaxzmo1hEHzkuCLX9Zyp5LsFImaFYl9RP2tHorUCR9Oa5Db00qLa3iHzF');


const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
          },
          products: async (parent, { category, name }) => {
            const params = {};
      
            if (category) {
              params.category = category;
            }
      
            if (name) {
              params.name = {
                $regex: name
              };
            }
      
            return await Product.find(params).populate('category');
          },
          product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
          },
          order: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              return user.orders.id(_id);
            }
      
            throw AuthenticationError;
          },
          checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            await Order.create({ products: args.products.map(({ _id }) => _id) });
            const line_items = [];
      
            // eslint-disable-next-line no-restricted-syntax
            for (const product of args.products) {
              // Create a line item for each product
              line_items.push({
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: product.name,
                    description: product.description,
                    images: [`${url}/images/${product.image}`]
                  },
                  unit_amount: product.price * 100,
                },
                quantity: product.purchaseQuantity,
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`,
            });
      
            return { session: session.id };
          },

    },
    Mutation: {
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw AuthenticationError;
          },
          updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
          },
    },
}

module.exports = resolvers;