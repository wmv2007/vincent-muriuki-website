export function getService (serviceId) {
  let matchingService;

  services.forEach((service) => {
    if (service.id === serviceId) {
      matchingService = service;
    }
  });


  return matchingService;
}

export const services = [{
  id: '001',
  name: 'Simple one page websites created using simple languages.',
  shortName: 'One-Page Website',
  priceCents: '15000'
}, {
  id: '002',
  name: `Simple multi-page websites created using simple languages.
No JavaScript.`,
  shortName: 'Multi-Page Website',
  priceCents: '18500'
}, {
  id: '003',
  name: 'Simple one page websites created using simple lanuages with javascript.',
  shortName: 'One-Page Website + JavaScript',
  priceCents: '22386'
}, {
  id: '004',
  name: 'Simple multipage page websites created using simple lanuages with javascript.',
  shortName: 'Multi-Page Website + JavaScript',
  priceCents: '39999'
}, {
  id: '005',
  name: 'complex multi page websites created using simple lanuages with javascript.',
  shortName: 'Advanced Website + JavaScript',
  priceCents: '180000'
}];