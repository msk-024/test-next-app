import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}

export const DeleteConfirmModal: React.FC<Props> = ({
  open,
  onClose,
  onDelete,
  loading,
}) => {
  if (!open) return null; // モーダルが非表示のときは描画しない

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <p className="mb-4">本当にこの投稿を削除しますか？</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            キャンセル
          </button>
          <button
            onClick={onDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
};
