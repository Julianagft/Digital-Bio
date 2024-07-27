import { useEffect, useState } from "react";
import { CodeSimple, Link } from "phosphor-react";
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import Toggle from "../Toggle/Toggle";
import updateLinkService from "@/service/links/updateLinkService/updateLinkService";


export default function ModalEditLink ({  open,
                                          setOpen,
                                          userData,
                                          linkData,
                                          linkId,
                                          setLinkData,
                                          handleEditSuccess,
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

  const [updatedLinkTitle, setUpdatedLinkTitle] = useState("");
  const [updatedUrl, setUpdatedUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const userId = userData.id;

  useEffect(() => {
    if (linkId && linkData.length > 0) {
        const linkInformation = linkData.find((link) => link.id === linkId);
        console.log("linkInformation: ", linkInformation)

        if (linkInformation) {
            setUpdatedLinkTitle(linkInformation.title || "");
            setUpdatedUrl(linkInformation.url || "");
            setIsPublic(linkInformation.isPublic || false);
            setIsActive(linkInformation.isActive || false);
        }
    }
}, [linkId, linkData]);

  console.log("linkData: ", linkData);
  console.log("linkId: ", linkId)

    async function handleUpdateLink() {
        if (!updatedLinkTitle || !updatedUrl) {
            return alert("Título e URL são necessários");    
        }

        try {

            const isActiveFinal = isPublic ? true : isActive;

            const linkData = {
                url: updatedUrl,
                title: updatedLinkTitle,
                isActive: isActiveFinal,
                isPublic: isPublic,
                userId: Number(userId),
            };

            const updatedLink = await updateLinkService(linkId, linkData);

            setLinkData(prevLinkData =>
                prevLinkData.map(link =>
                    link.id === linkId ? updatedLink : link
                )
            );

            setUpdatedUrl('');  
            setUpdatedLinkTitle('');

            setIsActive(false); 
            setIsPublic(false);

            setLoading(false);
            setOpen(false);
            handleEditSuccess();
 
            

        } catch (error) {
            console.error("Erro ao criar link:", error);
        }
    }

    loading ? <LoadingSpinCircle /> : ""

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
                <div className='w-[50px] flex items-center justify-center text-center py-2 px-1 bg-[#FFF6E5] rounded-md'>
                    <CodeSimple size={32} color="#F97316"/>
                </div>
                <div className="flex justify-center items-center">
                    <p className="font-semibold text-lg text-gray-500"> Editar Link </p>
                </div>
              </div>
              <div>
                <div className="w-full max-w-md mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Digite aqui o título</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        value={updatedLinkTitle}
                        placeholder={linkData.title}
                        onChange={(e) => setUpdatedLinkTitle(e.target.value)}
                    />
                </div>

                <div className="w-full max-w-md mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Digite aqui a URL do link</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        value={updatedUrl}
                        onChange={(e) => setUpdatedUrl(e.target.value)}
                    />
                </div>

                <div className="w-[450px] flex justify-start gap-2 px-2 mb-5">
                    <p className="font-bold">Público ?</p>&nbsp;<p>{isPublic ? "Sim" : "Não"}</p> &nbsp;
                    <Toggle checked={isPublic} onChange={(event) => setIsPublic(event)} />
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <div className="w-[30%] p-2 flex justify-center border-[1px] border-[#F97316] rounded-lg text-[#F97316] font-semibold">
                  <button onClick={handleClose} >
                    Cancelar
                  </button>
                </div>

                <div className="w-[30%] p-2 flex justify-center rounded-lg bg-[#F97316] text-white font-semibold">
                  <button onClick={handleUpdateLink}>
                    Atualizar
                  </button>
                </div>
              </div>
            </div>      
          </Box>
        </Fade>
      </Modal>
    )
}