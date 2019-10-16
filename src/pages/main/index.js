import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { StatusBar } from 'react-native';
import {
  Container,
  AnnotationContainer,
  AnnotationText,
  NewButtonContainer,
  ButtonsWrapper,
  CancelButtonContainer,
  SelectButtonContainer,
  ButtonText,
  Marker,
  ModalContainer,
  ModalImagesListContainer,
  ModalImagesList,
  ModalImageItem,
  ModalButtons,
  CameraButtonContainer,
  CancelButtonText,
  ContinueButtonText,
  TakePictureButtonContainer,
  TakePictureButtonLabel,
  DataButtonsWrapper,
  MarkerContainer,
  MarkerLabel,
  Form,
  Input,
  DetailsModalFirstDivision,
  DetailsModalSecondDivision,
  DetailsModalThirdDivision,
  DetailsModalBackButton,
  DetailsModalPrice,
  DetailsModalRealtyTitle,
  DetailsModalRealtySubTitle,
  DetailsModalRealtyAddress,
} from './styles';

 export default class Main extends Component {
  static navigationOptions = {
    header: null,
  }
  
  state = {
    locations: [],
    newRealty: false,
    cameraModalOpened: false,
    dataModalOpened: false,
    realtyData: {
      location: {
        latitude: null,
        longitude: null,
      },
      name: '',
      price: '',
      address: '',
      images: [],
    },
};

  async componentDidMount() {
    try {
      const response = await api.get('/properties', {
        params: {
          latitude: -27.210768,
          longitude: -49.644018,
        },
      });

    renderConditionalsButtons = () => (
      !this.state.newRealty ? (
        <NewButtonContainer onPress={this.handleNewRealtyPress}>
          <ButtonText>Novo Imóvel</ButtonText>
        </NewButtonContainer>
      ) : (
        <ButtonsWrapper>
          <SelectButtonContainer onPress={this.handleGetPositionPress}>
            <ButtonText>Selecionar localização</ButtonText>
          </SelectButtonContainer>
          <CancelButtonContainer onPress={this.handleNewRealtyPress}>
            <ButtonText>Cancelar</ButtonText>
          </CancelButtonContainer>
        </ButtonsWrapper>
      )
    )

      this.setState({ locations: response.data });
    } catch (err) {
      console.tron.log(err);
    }
  }

  handleNewRealtyPress = () => 
    this.setState({ newRealty: !this.state.newRealty })

handleGetPositionPress = async () => {
  try {
    const [longitude, latitude] = await this.map.getCenter();
    this.setState({
      cameraModalOpened: true,
      realtyData: {
        ...this.state.realtyData,
        location: {
          latitude,
          longitude,
        },
      },
    });
  } catch (err) {
    console.tron.log(err);
  }
}
renderMarker = () => (
  this.state.newRealty &&
  !this.state.cameraModalOpened &&
  <Marker resizeMode="contain" source={require('../../images/marker.png')} />
)
  renderLocations = () => (
    this.state.locations.map(location => (
      <MapboxGL.PointAnnotation
        id={location.id.toString()}
        coordinate={[parseFloat(location.longitude), parseFloat(location.latitude)]}
      >
        <AnnotationContainer>
          <AnnotationText>{location.price}</AnnotationText>
        </AnnotationContainer>
        <MapboxGL.Callout title={location.title}/>
      </MapboxGL.PointAnnotation>
    ))
  )
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <MapboxGL.MapView
          centerCoordinate={[-49.6446024, -27.2108001]}
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Dark}
        > 
          { this.renderLocations() }
          ref={map => {
          this.map = map;
          }}
        </MapboxGL.MapView>
        { this.renderConditionalsButtons() }
        { this.renderMarler() }
      </Container>
    );
  }
}
export default Main;