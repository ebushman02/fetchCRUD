import React from 'react';

class DeleteHouseButton extends React.Component {
  handleDelete = () => {
    const { houseId, onDelete } = this.props;
    onDelete(houseId);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleDelete}>Delete House</button>
      </div>
    );
  }
}

export default DeleteHouseButton;
