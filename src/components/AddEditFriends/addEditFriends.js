import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">NAME:</label>
    <input type="text" class="form-control" id="form-friend-name" placeholder="John NotSmith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">ADDRESS:</label>
    <input type="text class="form-control" id="form-friend-address" placeholder="500 Interstate Blvd">
  </div>
  <div class="form-group">
    <label for="form-friend-email">EMAIL:</label>
    <input type="text class="form-control" id="form-friend-email" placeholder="johnNotSmith@gmail.com">
  </div>
  <div class="form-group">
    <label for="form-friend-phone">PHONE:</label>
    <input type="text class="form-control" id="form-friend-phone" placeholder="555.555.5555">
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">RELATIONSHIP:</label>
    <input type="text class="form-control" id="form-friend-relationship" placeholder="Arch Nemesis">
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
  console.log(friend);
};
export default { formBuilder, gettingFriendFromForm };
