const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

let userCollection = null;

function setUserCollection(collection) {
  userCollection = collection;
}

async function createUser(userData) {
  try {
    if (!userCollection) {
      throw new Error('Database not initialized.');
    }

    const existingUser = await userCollection.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    if (existingUser) {
      throw new Error('Username or email already exists.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      username: userData.username,
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      password: hashedPassword,
      devAI: userData.devAI,
      devAIversion: userData.devAIversion,
      age: userData.age,
    };

    const result = await userCollection.insertOne(newUser);
    return {
      id: result.insertedId,
      username: newUser.username,
      email: newUser.email,
    };
  } catch (error) {
    throw error;
  }
}

async function findByEmail(email) {
  try {
    if (!userCollection) throw new Error('Database not initialized.');
    const user = await userCollection.findOne({ email });
    return user
      ? {
          id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
        }
      : null;
  } catch (error) {
    throw error;
  }
}

async function findById(userId) {
  try {
    if (!userCollection) throw new Error('Database not initialized.');
    const user = await userCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function updatePassword() {
  try {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await db
      .collection('users')
      .updateOne({ email }, { $set: { password: hashedPassword } });

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating password:', error);
    return false;
  }
}

module.exports = {
  setUserCollection,
  createUser,
  findByEmail,
  findById,
  updatePassword,
};
