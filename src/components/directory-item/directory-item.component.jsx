import { useNavigate } from "react-router-dom";
import {BackgroundImage, DirectoryBody, DirectoryItemContainer} from "./directory-item.styles";

const DirectoryItem = ({category}) => {

    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}/>
            <DirectoryBody>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryBody>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem