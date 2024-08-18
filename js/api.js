const fetchUserData = async (userId) => {
  try {
      const response = await fetch(`https://discord-web-api.glitch.me/discord/user/${userId}`, {
          method: "GET",
          mode: "cors",
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();
      console.log(`User data for ${userId}:`, userData); // Log dos dados do usuário
      return userData;
  } catch (error) {
      console.error("Something went wrong:", error);
      throw error;
  }
};

const setUserData = (imageElementId, usernameElementId, userData) => {
  const userImage = document.getElementById(imageElementId);
  const userName = document.getElementById(usernameElementId);

  if (userImage && userName) {
      userImage.src = userData.url;
      userName.textContent = userData.username;

  } else {
      console.warn("DOM elements not found.");
  }
};

const displayUserData = async (userId, imageElementId, usernameElementId) => {
  try {
      const userData = await fetchUserData(userId);
      if (userData && userData.url && userData.username) {
          setUserData(imageElementId, usernameElementId, userData);
      } else {
          throw new Error("User data is incomplete");
      }
  } catch (error) {
      console.warn("Error while loading user information:", error);
      const userName = document.getElementById(usernameElementId);
      if (userName) {
          userName.textContent = "Erro ao carregar informações do usuário.";
      }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  displayUserData('1173244265900556333', 'loysnk', 'username1');  
  displayUserData('1267840812247683083', 'mendes', 'username2');
  displayUserData('1208167405658832987', 'hg', 'username3');
  displayUserData('752561913690456115', 'jota', 'username4');
  displayUserData('989378485258686565', 'edin', 'username5');  
});
