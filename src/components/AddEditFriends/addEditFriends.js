import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import initializeFriendsPage from '../FriendsPage/friendsPage';

const formBuilder = (friend) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">NAME:</label>
    <input type="text" class="form-control" value="${friend.name}" id="form-friend-name" placeholder="John NotSmith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">ADDRESS:</label>
    <input type="text" class="form-control" value="${friend.address}" id="form-friend-address" placeholder="500 Interstate Blvd">
  </div>
  <div class="form-group">
    <label for="form-friend-email">EMAIL:</label>
    <input type="text" class="form-control" value="${friend.email}" id="form-friend-email" placeholder="johnNotSmith@gmail.com">
  </div>
  <div class="form-group">
    <label for="form-friend-phone">PHONE:</label>
    <input type="text" class="form-control" value="${friend.phoneNumber}" id="form-friend-phone" placeholder="555.555.5555">
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">RELATIONSHIP:</label>
    <input type="text" class="form-control" value="${friend.relationship}" id="form-friend-relationship" placeholder="Arch Nemesis">
  </div>
  `;

  return form;
};

const gettingFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    relationship: $('#form-friend-relationship').val(),
    phoneNumber: $('#form-friend-phone').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return (friend);
};

const buildAddForm = () => {
  const emptyFriend = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  };

  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder(emptyFriend);
  domString += '<button id="add-friend">Add Friend</button>';
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
};

const addNewFriend = () => {
  const newFriend = gettingFriendFromForm();
  friendsData
    .addNewFriend(newFriend)
    .then(() => {
      $('#add-edit-friend')
        .html('')
        .hide();
      $('#friends').show();
      initializeFriendsPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateFriend = (e) => {
  const updatedFriend = gettingFriendFromForm();
  const friendId = e.target.dataset.singleEditId;
  friendsData.updateFriend(updatedFriend, friendId)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#single-container').html('');
      $('#friends').show();
      initializeFriendsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit //
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  friendsData.getSingleFriend(idToEdit)
    .then((singleFriend) => {
      let domString = '<h2>Edit Friend</h2>';
      domString += formBuilder(singleFriend);
      domString += `<button id="edit-friend" data-single-edit-id=${singleFriend.id}>Save Friend</button>`;
      $('#add-edit-friend').html(domString).show();
      $('#friends').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

$('body').on('click', '#add-friend', addNewFriend);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-friend', updateFriend);

export default buildAddForm;
