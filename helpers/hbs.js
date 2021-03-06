const moment = require('moment');
const auth = require('./auth');

module.exports = {
  truncate: function(str, len) {
    if ( str.length > len && str.length > 0 ) {
      var new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },

  stripTags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },

  formatDate: function(date, format){
    return moment(date).format(format);
  },

  select: function(selected, options) {
    return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
  },

  editIcon: function(storyUser, loggedUser, storyId, floating = true) {
    if ( loggedUser && storyUser ) {
      if ( storyUser.id === loggedUser.id ||
        auth.isAdmin(loggedUser)
        ) {
        if ( floating ) {
          return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
        } else {
          return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
        }
      } else {
        return '';
      }
    } else {
      return '';
    }
  },

  cardStatus: function(status) {
    if (status == 'public') {
      return '<div class="card">';
    } else if (status == 'unpublished' ) {
      return '<div class="card teal lighten-4">';
    } else { // private
      return '<div class="card blue-grey lighten-5">';
    }
  },

  adminMenuItems: function(user) {
    let data = '';
    if (auth.isAdmin(user)) {
        data = `<li>
                 <a href="/stories/all"><i class="fa fa-th-list"></i> All Stories</a>
              </li>`;
    }
    return data;
  }
}