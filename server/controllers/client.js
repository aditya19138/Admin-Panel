import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// get all courses
export const getCourses = async (req, res) => {
  Course
    .find().then((courses) => {
      res.status(200).json(courses)
    })
}

// fetch lectures of a particular course
export const fetchLectures = async (req, res) => {
  const { id } = req.query;
  Course.find({ _id: id })
    .populate('lectures')
    .then((resp) => {
      let lectures = resp[0].lectures
      res.status(200).json(lectures)
    })
}

// fetch a single lecture
export const getLecture = async (req, res) => {
  const { id } = req.query;
  Lecture.find({ _id: id })
    .then((resp) => {
      res.status(200).json(resp)
    })
}

// post request to add a lecture
export const postLecture = async (req, res) => {
  const { no, title, content, courseId } = req.body;
  console.log(req.body)
  const newLecture = new Lecture({
    no,
    title,
    content,
    course: courseId
  });
  newLecture.save()
    .then((lecture) => {
      console.log(lecture)
      Course.findOneAndUpdate({ _id: courseId }, { $push: { lectures: newLecture._id } })
        .then((course) => res.status(200).json({ message: "lecture added successfully" })
        )
    })
    .catch((err) => res.status(500).json({ message: err.message }))


}

// patch request to update a lecture
export const updateLecture = async (req, res) => {
  const { title, content, lectureId } = req.body;
  Lecture.findOneAndUpdate({ _id: lectureId }, { title, content })
    .then((lecture) => console.log(lecture))
  res.status(200).json({ message: "lecture updated successfully" })


}
// post request to delete a lecture
export const deleteLecture = async (req, res) => {
  const { lectureId, courseId } = req.body;
  console.log(lectureId, courseId)
  Lecture.deleteOne({ _id: lectureId })
    .then((lecture) => console.log(lecture))
  Course.findOneAndUpdate({ _id: courseId }, { $pull: { lectures: lectureId } })
    .then((course) => console.log(course))
  res.status(200).json({ message: "lecture deleted successfully" })
}

// get request to get all the registers users
export const getUsers = async (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users)
  })
}

// post request to delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  User.deleteOne({ _id: userId })
    .then((user) => res.status(200).json({ message: "user deleted successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }))
}


