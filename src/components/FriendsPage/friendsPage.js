import axios from 'axios';
import $ from 'jquery';
import './friendsPage.scss';
import apiKeys from '../../../db/apiKeys.json';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import holidayFriendsData from '../../helpers/data/holidayFriendsData';
import holidaysData from '../../helpers/data/holidaysData';

const holidayStringBuilder = (holidays) => {
  let holidayString = '<h3>HOLIDAYS:</h3>';
  holidays.forEach((holiday) => {
    holidayString += `<h5>${holiday.name} ${holiday.Date}</h5>`;
  });
  return holidayString;
};

const printSingleFriend = (friend, holidays) => {
  const friendString = `
  <div id="singleFriend">
  <div id="singleBorder">
    <h1>${friend.name}</h1>
    <h3>${friend.relationship}</h3>
    <p>${friend.address}</p>
    <p>${friend.email}</p>
    <p>${friend.phoneNumber}</p>
    <button class="btn btn-danger delete-btn" data-delete-id=${friend.id}>X</button>
    <button class="btn btn-info edit-btn" data-edit-id=${friend.id}>EDIT</button>
    <div class="holiday-container">${holidayStringBuilder(holidays)}</div>
    </div>
    </div>
  `;
  $('#single-container').html(friendString);
};


const getSingleFriend = (e) => {
  // firebase id
  const friendId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  friendsData.getSingleFriend(friendId).then((singleFriend) => {
    holidayFriendsData.getHolidayIdsForFriend(friendId).then((holidayIds) => {
      console.log('holidayIds', holidayIds);
      holidaysData.getHolidaysByArrayOfIds(uid, holidayIds).then((holidays) => {
        printSingleFriend(singleFriend, holidays);
      });
    });
  })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropdown = (friendsArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    CHOOSE FRIEND
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (friendsArray.length) {
    friendsArray.forEach((friend) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id='${friend.id}'>${friend.name}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">You have no friends, loser.</div>';
  }

  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const friendsPage = () => {
  const uid = authHelpers.getCurrentUid();
  friendsData.getAllFriends(uid)
    .then((friendsArray) => {
      buildDropdown(friendsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteFriend = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  axios.delete(`${apiKeys.firebaseKeys.databaseURL}/friends/${idToDelete}.json`)
    .then(() => {
      friendsPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.dropdown-item', getSingleFriend);
  $('body').on('click', '.delete-btn', deleteFriend);
};

const initializeFriendsPage = () => {
  friendsPage();
  bindEvents();
};

export default initializeFriendsPage;
