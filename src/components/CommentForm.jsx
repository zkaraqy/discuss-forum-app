import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Textarea from './Textarea';

export default function CommentForm({ content, setContent, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="my-4">
      <div className="form-control">
        <Textarea
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Tulis komentar Anda..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required={true}
        />
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            className="btn-primary"
            disabled={!content.trim()}
          >
            Kirim
          </Button>
        </div>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
