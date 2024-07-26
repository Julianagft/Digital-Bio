import { useState } from "react";
import { Link } from "phosphor-react";
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import Toggle from "../Toggle/Toggle";
import createLinkService from "@/service/links/createLinkService/createLinkService";


export default function ModalCreateLink ({open,
                                          setOpen,
                                          userData,
                                          handleCreateSuccess,
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

  const [linkData, setLinkData] = useState([]);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isActive, setIsActive] = useState(false);

  console.log("userData: ", userData);

    async function handleCreateLink() {
        if (!newLinkTitle || !newLinkUrl) {
            return alert("Título e URL são necessários");    
        }

        try {

            const isActiveFinal = isPublic ? true : isActive;

            const userId = userData.id;

            const linkData = {
                url: newLinkUrl,
                title: newLinkTitle,
                isActive: isActiveFinal,
                isPublic: isPublic,
                userId: Number(userId),
            };

            const createdLink  = await createLinkService(userId, linkData);
            alert("Link criado com sucesso!");

            setLinkData(prevLinkData => [...prevLinkData, createdLink]);
            setNewLinkUrl('');  
            setNewLinkTitle('');
            setIsActive(false); 
            setIsPublic(false);

            setLoading(false);
            setOpen(false);
            handleCreateSuccess();
 
            

        } catch (error) {
            console.error("Erro ao criar link:", error);
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
              <div className="w-full p-3 flex gap-4">
                <div className='w-[50px] flex items-center justify-center text-center py-2 px-1 bg-blue-300 rounded-md'>
                    <Link size={32} color="#1e3a8a"/>
                </div>
                <div className="flex justify-center items-center">
                    <p className="font-semibold text-lg text-gray-500"> Criar novo link </p>
                </div>
              </div>
              <div>
                <div className="w-full max-w-md mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Digite aqui o título</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        value={newLinkTitle}
                        placeholder="Título do link"
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                    />
                </div>

                <div className="w-full max-w-md mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Digite aqui a URL do link</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                    />
                </div>

                <div className="w-[450px] flex justify-start gap-2 px-2 mb-5">
                    <p className="font-bold">Público ?</p>&nbsp;<p>{isPublic ? "Sim" : "Não"}</p> &nbsp;
                    <Toggle checked={isPublic} onChange={(event) => setIsPublic(event)} />
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <div className="w-[30%] p-2 flex justify-center border-[1px] border-[#1e3a8a] rounded-lg text-[#1e3a8a] font-semibold">
                  <button onClick={handleClose} >
                    Cancelar
                  </button>
                </div>

                <div className="w-[30%] p-2 flex justify-center rounded-lg bg-[#1e3a8a] text-white font-semibold">
                  <button onClick={handleCreateLink}>
                    Criar
                  </button>
                </div>
              </div>
            </div>

            
          </Box>
        </Fade>
      </Modal>
    )
}