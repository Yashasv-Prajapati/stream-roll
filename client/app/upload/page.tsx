import UploadModal from '@/components/upload-modal';

const UploadPage = () => {

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <UploadModal />
    </div>
  );
};

export default UploadPage;
