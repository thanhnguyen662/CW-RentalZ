const prisma = require('../models/prisma');

class RentalController {
   createRentalForm = async (req, res, next) => {
      try {
         const isExist = await prisma.rental.findUnique({
            where: { address: req.body.address },
         });

         if (isExist) return res.json({ message: 'Address is exist' });

         const response = await prisma.rental.create({
            data: {
               name: req.body.name,
               address: req.body.address,
               startDate: new Date(req.body.startDate),
               endDate: new Date(req.body.endDate),
               price: Number(req.body.rentPrice),
               note: req.body.note,

               properties: {
                  create: {
                     propertyType: req.body.propertyType,
                     bedRoom: req.body.bedRoom,
                     furnitureType: req.body.furnitureType,

                     extras: {
                        createMany: {
                           data: [
                              { type: 'propertyType', description: null },
                              { type: 'bedRoom', description: null },
                              { type: 'furnitureType', description: null },
                           ],
                        },
                     },
                  },
               },
            },
         });
         return res.json({ ...response, message: 'Created success' });
      } catch (error) {
         return next(error);
      }
   };

   getRentalForm = async (req, res, next) => {
      try {
         const response = await prisma.rental.findMany({
            include: {
               properties: {
                  include: {
                     extras: true,
                  },
               },
            },
         });
         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };

   deleteRentalForm = async (req, res, next) => {
      try {
         const response = await prisma.rental.delete({
            where: { id: req.body.rentalId },
         });
         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };

   getExtraNote = async (req, res, next) => {
      try {
         const response = await prisma.extra.findMany({
            where: {
               propertyId: Number(req.query.propertyId),
            },
         });
         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };

   updateExtraNote = async (req, res, next) => {
      try {
         const batchUpdate = req.body.extra.map(async (item) => {
            return await prisma.extra.update({
               where: { id: item.id },
               data: { description: item.description },
            });
         });
         const response = await Promise.all(batchUpdate);
         res.json({ ...response, message: 'Update success' });
      } catch (error) {
         return next(error);
      }
   };

   search = async (req, res, next) => {
      const searchKeyword = req.query.searchKeyword;
      const splitToFullTextSearch =
         searchKeyword.replace(/ /g, ' | ') || undefined;
      try {
         const response = await prisma.rental.findMany({
            where: {
               OR: [
                  {
                     properties: {
                        some: {
                           furnitureType: {
                              search: splitToFullTextSearch,
                              mode: 'insensitive',
                           },
                        },
                     },
                  },
                  {
                     properties: {
                        some: {
                           bedRoom: {
                              search: splitToFullTextSearch,
                              mode: 'insensitive',
                           },
                        },
                     },
                  },
                  {
                     properties: {
                        some: {
                           propertyType: {
                              search: splitToFullTextSearch,
                              mode: 'insensitive',
                           },
                        },
                     },
                  },
                  {
                     note: {
                        search: splitToFullTextSearch,
                        mode: 'insensitive',
                     },
                  },
                  {
                     properties: {
                        some: {
                           extras: {
                              some: {
                                 description: {
                                    search: splitToFullTextSearch,
                                    mode: 'insensitive',
                                 },
                              },
                           },
                        },
                     },
                  },
               ],
            },
            include: {
               properties: {
                  include: {
                     extras: true,
                  },
               },
            },
         });
         return res.json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new RentalController();
