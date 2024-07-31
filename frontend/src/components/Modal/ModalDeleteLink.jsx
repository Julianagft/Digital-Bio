import { useState } from "react";
import { Trash } from "phosphor-react";
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import deleteLinkService from "@/service/links/deleteLinkService/deleteLinkService";


export default function ModalDeleteLink ({open,
                                          setOpen,
                                          linkId,
                                          handleDeleteSuccess,
                                          handleClose = () => {},
                                        }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  const [loading, setLoading] = useState(false);

    
    async function handleDeleteLink() {
      try {

        await deleteLinkService(linkId);
        setLoading(false);
        setOpen(false);
        handleDeleteSuccess(); 
        handleClose();

    } catch (error) {
        console.error("Erro ao deletar link:", error);
    }
    }

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col justify-between gap-8">
              <div className="w-full p-3 flex gap-3">
                <div className='w-[60px] flex items-center justify-center text-center p-2 bg-red-300 rounded-md'>
                  <Trash size={32} color="#D93644"/>
                </div>
                <p className="font-semibold text-gray-500"> Tem certeza que deseja deletar seu link? </p>
              </div>

              <div className="flex justify-center gap-6">
                <div className="w-[30%] p-2 flex justify-center border-[1px] border-[#D93644] rounded-lg text-[#D93644] font-semibold">
                  <button onClick={handleClose} >
                    Cancelar
                  </button>
                </div>

                <div className="w-[30%] p-2 flex justify-center rounded-lg bg-red-600 text-white font-semibold">
                  <button onClick={handleDeleteLink}>
                    Deletar
                  </button>
                </div>
              </div>
            </div>
            
          </Box>
        </Fade>
      </Modal>
    )
}