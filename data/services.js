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
  includes: '1 responsive page, up to 5 sections, contact form, 2 rounds of edits.',
  shortName: 'One-Page Website',
  priceCents: '8000',
  note: '"Hosting and domain name not included."',
  example: 'examples/barber_shop_project/cut and craft.html'
}, {
  id: '002',
  includes: `Up to 5 pages, shared navigation, mobile-friendly design, 2 rounds of edits.`,
  shortName: 'Multi-Page Website',
  priceCents: '13000',
  note: '"Hosting and domain name not included."',
  example: 'examples/Sunrise_Bakery_Client_HTML_CSS_Project/starter/sunrise-bakery.html'
}, {
  id: '003',
  includes: '1 responsive page with interactive features(menu, form checks, accordion), 2 rounds of edits.',
  shortName: 'One-Page Website + JavaScript',
  note: '"Hosting and domain name not included."',
  priceCents: '15000',
  example: 'examples/Sunrise_Bakery_js/starter/sunrise-bakery.html'
}, {
  id: '004',
  includes: 'Up to 5 pages with interactive features, mobile-friendly, 2 rounds of edits.',
  shortName: 'Multi-Page Website + JavaScript',
  note: '"Hosting and domain name not included."',
  priceCents: '25000'
}];